import React, { useState, FormEvent } from 'react';
import PageHeader from '../../compoents/PageHeader';
import Input from '../../compoents/Input';
import { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Textarea from '../../compoents/TextArea';
import Select from '../../compoents/Select';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");
    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState("");

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: "", to: "" }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: "", to: "" }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index == position) {
                return { ...scheduleItem, [field]: value };
            }
            return scheduleItem;
        });
        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        api.post('classes', {
            name, avatar, whatsapp, bio, subject,
            cost: Number(cost), schedule: scheduleItems
        }).then(() => {
            alert('Cadastro efetuado com sucesso!');
            history.push('/');
        }).catch(() => {
            alert('Falha ao realizar cadastro.');
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher este formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            label="Nome Completo"
                            name="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            label="Avatar"
                            name="avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            label="Whatsapp"
                            name="whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a Aula</legend>
                        <Select
                            label="Materia"
                            name="subject"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Literatura', label: 'Literatura' },
                                { value: 'Português', label: 'Português' },
                                { value: 'História', label: 'História' },
                                { value: 'Geografia', label: 'Geografia' },
                            ]}
                        />
                        <Input
                            label="Custo da sua aula"
                            name="cost"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo Horário</button>
                        </legend>
                        {scheduleItems.map((scheduleItem, i) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        label="Dia da Semana"
                                        name="week_day"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(i, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(i, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(i, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;