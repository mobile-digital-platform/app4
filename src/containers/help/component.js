import React,{Component} from 'react';
import {Keyboard,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import AnimatedButton	from '../../templates/animated_button';
import Dialog			from '../../templates/dialog';
import Input			from '../../templates/input';
import TextArea			from '../../templates/textarea';

import help_request		from '../../redux/reducers/help';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	textarea: {
		height: 200,
	},
	button: {
		marginTop: 5,
	},
});

export default withNavigation(class HelpComponent extends Component {
	constructor(props) {
		super(props);

		this.promo_id = props.navigation.getParam('promo_id',0);

		// Отступы, примерно на которых расположены поля ввода
		this.scroll = React.createRef();
		this.inputs = {
			from: {
				ref: React.createRef(),
				offset: 0,
			},
			question: {
				ref: React.createRef(),
				offset: 0,
			},
			text: {
				ref: React.createRef(),
				offset: 70 + (props.user.id?0:60),
			},
			mail: {
				ref: React.createRef(),
				offset: 200 + (props.user.id?0:60),
			},
		};

		// Необходимые для заполнения поля
		this.required = ['question','text','mail'];
		if(!this.props.user.id) this.required.push('from');

		this.state = {
			from: '',
			question: 'Вопрос по призам',
			text: '',
			mail: props.user.mail,

			from_error: '',
			question_error: '',
			text_error: '',
			mail_error: '',

			show_dialog: false,
			dialog_text: '',

			result: false,
			ready: false,
			waiting: false,

			button_state: 'ready',
		};
	}

	update = async (adjust) => {
		await this.setState(adjust);
		console.log(this.required);
		this.required.forEach(field => {
			if(this.state[field].length && this.state[field+'_error'].length) this.setState({[field+'_error']:''});
		});
	}

	// Проверяем, готова ли форма
	check_ready = async () => {
		await this.setState(state => ({ready:this.required.every(field => state[field].length)}));
	}

	// Указание на ошибки при заполнении полей
	check_completeness = async () => {
		let {props,state} = this;

		await this.check_ready();

		// Указываем на то, что не заполнено
		if(!props.user.id && !state.from.length) {
			if(state.from.length) {
				this.setState({['from_error']:''});
			} else {
				this.setState({['from_error']:'Введите ваше имя'});
				this.scroll.current.scrollTo({y:this.inputs.from.offset});
				return false;
			}
		} else if(!state.question.length) {
			if(state.question.length) {
				this.setState({['question_error']:''});
			} else {
				this.setState({['question_error']:'Выберите тему вопроса'});
				this.scroll.current.scrollTo({y:this.inputs.question.offset});
				return false;
			}
		} else if(!state.text.length) {
			if(state.text.length) {
				this.setState({['text_error']:''});
			} else {
				this.setState({['text_error']:'Введите текст вопроса'});
				this.scroll.current.scrollTo({y:this.inputs.text.offset});
				return false;
			}
		} else if(!state.mail.length) {
			if(state.mail.length) {
				this.setState({['mail_error']:''});
			} else {
				this.setState({['mail_error']:'Введите адрес электронной почты'});
				this.scroll.current.scrollTo({y:this.inputs.mail.offset});
				return false;
			}
		}
		return true;
	}

	send = async () => {
		let {props,state} = this;

		Keyboard.dismiss();
		if(state.waiting) return;

		// Проверяем все поля
		if(!await this.check_completeness()) return;

		// Отправляем изменения
		await this.setState({waiting:true,button_state:'waiting'});
		let {response,error} = await help_request({
			user_id:	props.user.id || null,
			promo_id:	this.promo_id || null,
			from:		state.from,
			question:	state.question,
			text:		state.text,
			mail:		state.mail,
		});
		if(response) {
			this.setState({
				result: true,
				dialog_text: 'Ваше сообщение принято\nОтвет будет отправлен по электронной почте на адрес:\n'+state.mail,
			});
		}
		if(error) {
			this.setState({result:false,dialog_text:error.message});
		}
		this.setState({waiting:false,button_state:'end'});
	}

	show_dialog = () => this.setState({show_dialog:true});

	back = () => {
		this.setState({show_dialog:false});
		if(this.state.result) this.props.navigation.goBack();
	}

	render() {
		let {props,state} = this;

		return (
			<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={styles.container}>
				{!props.user.id ? (
				<Input
					title="Ваше имя"
					value={state.from}
					update={from => this.update({from})}
					error={state.from_error}
					keyboard_options={{
						scroll: this.scroll,
						offset: this.inputs.from.offset,
					}}
				/>
				) : null}
				<Input
					id={this.inputs.question.ref}
					title="Выберите тему вопроса"
					value={state.question}
					disabled={true}
					update={question => this.update({question})}
					error={state.question_error}
					keyboard_options={{
						scroll: this.scroll,
						offset: this.inputs.question.offset,
					}}
				/>
				<TextArea
					id={this.inputs.text.ref}
					style={styles.textarea}
					value={state.text}
					placeholder="Текст вопроса"
					update={text => this.update({text})}
					error={state.text_error}
					keyboard_options={{
						scroll: this.scroll,
						offset: this.inputs.text.offset,
					}}
				/>
				<Input
					id={this.inputs.mail.ref}
					title="E-mail"
					value={state.mail}
					disabled={props.mail?.length}
					update={mail => this.update({mail})}
					error={state.mail_error}
					keyboard_options={{
						scroll: this.scroll,
						offset: this.inputs.mail.offset,
					}}
				/>
				<View style={styles.button}>
					<AnimatedButton
						active={state.ready}
						state={state.button_state}
						on_press={this.send}
						on_end={this.show_dialog}
					>
						Отправить
					</AnimatedButton>
				</View>
				<Dialog
					visible={state.show_dialog}
					text={state.dialog_text}
					on_next={this.back}
				/>
			</ScrollView>
		);
	}
});
