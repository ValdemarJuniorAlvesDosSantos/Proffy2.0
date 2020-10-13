
import React, {FormEvent, useContext, useState,useEffect} from 'react';
import Input from '../../components/Input';
import PageHeader  from '../../components/PageHeader';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import AuthContext from '../../contexts/auth';
import warningIcon from '../../assets/images/icons/warning.svg';
import "./styles.css";
import api from "../../services/api";
function Profile (){
    const {user} = useContext(AuthContext);
    const [name,setName] = useState(user?.name);
    const [lastName,setLastName] = useState(user?.lastName)
    const [email,setEmail] = useState(user?.email)
    const [whatsapp,setWhatsapp] = useState(user?.whatsapp)
    const [bio,setBio] = useState(user?.bio)

    const [scheduleItems,setScheduleItems] = useState([
        {week_day:0,from: '00:00',to:'00:00'}
    ])
    const [classesItems,setClassesItems] = useState([
        {subject:'Artes',cost:'0'}
    ])
    function userInfoInit(){
        api.get("user_info", {
            params:{
                user_id:user?.id
            }
        }).then((res)=>{
            setClassesItems(res.data.subjects);
            setScheduleItems(res.data.schedule);
        })
        
    }
    useEffect( userInfoInit ,[])
    async function saveModifications(e: FormEvent){
        e.preventDefault();
        
        await api.post("update", {
            user_id: user?.id,
            name,
            lastName,
            bio,
            whatsapp,
            schedule:scheduleItems,
            subjects:classesItems

        }).then(()=>{
             alert("Atualização feita com sucesso");
        }).catch((err)=>{
            alert("erro na atualização")
            console.log(err)
        });
    }

    function addNewClassesItem (){
        setClassesItems([...classesItems,
            {subject:'Artes',cost:'0'}
        ]);

    }
    function setClassesItemValue (index:number , field:string,value:string){
        const updateClassesItems = classesItems.map((scheduleItem,position)=>{
            if (index === position){
                return { ...scheduleItem, [field]:value};
            }
            return scheduleItem;
        })
        
        setClassesItems(updateClassesItems);
    }
    function removeClasseItem(index:number){
        const updateClassesItems = classesItems.slice(0,index).concat(classesItems.slice(index+1))
        setClassesItems(updateClassesItems);
    }

    function addNewScheduleItem (){
        setScheduleItems([...scheduleItems,
            {week_day:0,from: '',to:''}
        ]);

    }
    function setScheduleItemValue (index:number , field:string,value:string){
        const updateScheduleItems = scheduleItems.map((scheduleItem,position)=>{
            if (index === position){
                return { ...scheduleItem, [field]:value};
            }
            return scheduleItem;
        })
        
        setScheduleItems(updateScheduleItems);
    }
    function removeScheduleItem(index:number){
        const updateScheduleItems = scheduleItems.slice(0,index).concat(scheduleItems.slice(index+1))
        setScheduleItems(updateScheduleItems);
    }

    return (
        <div className="page-profile">
            <PageHeader title='Meu perfil'>
                <div className="header-profile">
                    <img src={user?.avatar} className="avatar" alt="Avatar"/>
                    <p>{`${user?.name} ${user?.lastName}`}</p>
                </div>                
            </PageHeader>
            <main>
                <div className="page-profile-content">
                    <form onSubmit={saveModifications}>
                            <fieldset className="your-data">
                                <legend>Seus Dados</legend>
                                <div className="two-input">
                                    <Input name="name" label="Nome" value={name} onChange={(e)=>{setName(e.target.value)} }/>
                                    <Input name="lastName" label="Sobrenome" value={lastName} onChange={(e)=>{setLastName(e.target.value)} }/>
                                </div>
                                <div className="two-input">
                                    <div className="email">
                                        <Input name="email" label="Email" value={email} onChange={(e)=>{setEmail(e.target.value)} }/>
                                    </div>                                    
                                    <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}
                                                                             
                                    />
                                </div>                            
                                <TextArea name="bio" label="Biografia" value={bio} onChange={(e)=>{setBio(e.target.value)} }/>
                                
                            </fieldset>
                            
                            <fieldset className="class-data-fieldset">
                                <legend>
                                    Sobre as Aulas
                                    <button type="button" onClick={addNewClassesItem}> + Nova Matéria</button>
                                </legend>
                                
                                    {classesItems.map((classItem,index) =>{
                                        return (
                                            <div key={index} className="item-block">
                                                <div className="class-data">
                                                    <Select name="subject"
                                                        label="Matéria"
                                                        value={classItem.subject}
                                                        onChange={(e)=>{setClassesItemValue(index,'subject',e.target.value)} }
                                                        options={[
                                                            {value:'Artes', label:'Artes'},
                                                            {value:'Biologia', label:'Biologia'},
                                                            {value:'Ciências', label:'Ciências'},
                                                            {value:'Educação Física', label:'Educação Física'},
                                                            {value:'Física', label:'Física'},
                                                            {value:'Geografia', label:'Geografia'},
                                                            {value:'História', label:'História'},
                                                            {value:'Matemática', label:'Matemática'},
                                                            {value:'Português', label:'Português'},
                                                            {value:'Química', label:'Química'}

                                                        ]}
                                                    />
                                                    <Input name="cost" label="Custo da sua hora aula" value={classItem.cost}
                                                        onChange={(e)=>{setClassesItemValue(index,'cost',e.target.value)} }
                                                    />
                                                </div>
                                                <button type="button" onClick={e=>removeClasseItem(index)}> Excluir Matéria</button>
                                            </div>

                                        )
                                    })

                                    }
                                    
                                                                                      
                            </fieldset>

                            <fieldset>
                                <legend>
                                    Horários disponíveis
                                    <button type="button" onClick={addNewScheduleItem}> + Novo horário</button>
                                </legend>
                                {scheduleItems.map( (scheduleItem, index) => {
                                        return(
                                        <div key={index} className="item-block">
                                            <div className="schedule-item">
                                                    <Select name="week_day"
                                                        label="Dia da Semana"
                                                        onChange ={e=>setScheduleItemValue(index,'week_day',e.target.value)}
                                                        value={scheduleItem.week_day}
                                                        options={[
                                                            {value:'0', label:'Domingo'},
                                                            {value:'1', label:'Segunda-feira'},
                                                            {value:'2', label:'Terça-feira'},
                                                            {value:'3', label:'Quarta-feira'},
                                                            {value:'4', label:'Quinta-feira'},
                                                            {value:'5', label:'Sexta-feira'},
                                                            {value:'6', label:'Sábado'}
                                                            
                                                        ]}                            
                                                    />
                                                    <Input 
                                                        name="from" 
                                                        label="Das"
                                                        type="time"
                                                        value={scheduleItem.from}
                                                        onChange ={e=>setScheduleItemValue(index,'from',e.target.value)}
                                                    />
                                                    <Input 
                                                        name="to"
                                                        label="Até"
                                                        type="time"
                                                        value={scheduleItem.to}
                                                        onChange ={e=>setScheduleItemValue(index,'to',e.target.value)}
                                                    />
                                            </div>                                            
                                            <button type="button" onClick={e=>removeScheduleItem(index)}> Excluir Horário</button>
                                        </div>)
                                    }
                                )}
                            </fieldset>
                            <footer>
                            <div className="footerLeft">
                                    
                                    <img src={warningIcon} alt="Aviso Importante"/>
                                    <h1>
                                        Importante! <br/>
                                        <p>
                                         Preencha todos os dados.
                                        </p>
                                    </h1>
                                    
                            </div>
                            <button type="submit">
                                        Salvar Cadastro.
                            </button>
                            </footer>

                    </form>
                </div>
            </main>
            
        </div>

    );

}

export default Profile;