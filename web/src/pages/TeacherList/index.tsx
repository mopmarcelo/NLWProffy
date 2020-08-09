import React, { useState, FormEvent } from 'react';
import './styles.css';

import PageHeader from '../../compoents/PageHeader';
import TeacherItem, { Teacher } from '../../compoents/TeacherItem';
import Input from '../../compoents/Input';
import Select from '../../compoents/Select';

import api from '../../services/api';
import { Console } from 'console';


function TeacherList() {
    const [teachers, setTeacher] = useState([]);

    const [subject, setSubject] = useState("");
    const [week_day, setWeekDay] = useState("");
    const [time, setTime] = useState("");

    async function searchTeacher(e: FormEvent) {
        e.preventDefault();
        const response = await api.get('classes', {
            params: {
                subject, week_day, time
            }
        });

        setTeacher(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis." >
                <form action="" id="search-teachers" onSubmit={searchTeacher}>
                    <Select
                        label="Matéria"
                        name="subject"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
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
                    <Select
                        label="Dias da Semana"
                        name="week_day"
                        value={week_day}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sábado' },
                            { value: '6', label: 'Domingo' },
                        ]}
                    />
                    <Input
                        name="time"
                        type="time"
                        label="Hora"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                    />
                })}
            </main>
        </div>
    )
}

export default TeacherList;