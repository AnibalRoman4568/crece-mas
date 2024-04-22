import { useEffect,useState, useRef } from 'react';
//import logo from './logo.svg';
import './modal.css';
import 'bootstrap/dist/css/bootstrap.css';

function isValidDni(dni) {
  // Regular expression for a simple email validation
  const dniRegex = /^[0-9]{8}$/;
  return dniRegex.test(dni);
}

function App() {
  
  const fechaHoy = new Date();
  const strFechaHoy = fechaHoy.getFullYear() + "-" + (String(fechaHoy.getMonth()+1).padStart(2,'0')) +"-"+fechaHoy.getDate()

  const [pacientes,setPacientes] = useState([]);
  const [pacienteActual,setPacienteActual] = useState(0);
  const [mensajeErrorRegistro,setMensajeErrorRegistro] = useState("");
  
  localStorage.setItem("pacientes",JSON.stringify(pacientes));

  const nombreRef = useRef(null);
  const fechaRef= useRef(null);
  const dniRef = useRef(null);
  const horaRef = useRef(null);
  const sintomasRef = useRef(null);
  const generoRef = useRef(null);

  const [openModalBorrar,setOpenModalBorrar] = useState(false);
  const [openModalRegistro,setOpenModalRegistro] = useState(false);
  const [openModalEditar,setOpenModalEditar]=useState(false);

  const toggleModalRegistro = () =>{
    setOpenModalRegistro(!openModalRegistro)
  }

  const toggleModal = () =>{
    setOpenModalBorrar(!openModalBorrar)
  }

  const agendar = () =>{
    
    if(nombreRef.current.value == "" || fechaRef.current.value == "" || dniRef.current.value == "" || horaRef.current.value == "" || sintomasRef.current.value == "" || generoRef.current.value == "--"){
      toggleModalRegistro();
      setMensajeErrorRegistro("Por favor completar todos los campos");
    }else if(!isValidDni(dniRef.current.value)){
      toggleModalRegistro();
      setMensajeErrorRegistro("Ingrese un DNI valido")
    }else{
      const pacientesLocal = localStorage.getItem("pacientes");
      const pacientesData = JSON.parse(pacientesLocal);

      let gen = "";
      switch(generoRef.current.value){
        case "1":
          gen="Masculino";
          break;
        case "2":
          gen="Femenino";
          break;
      }

      const datosPaciente = {
        nombre: nombreRef.current.value,
        fecha: fechaRef.current.value,
        dni: dniRef.current.value,
        hora: horaRef.current.value,
        sintomas: sintomasRef.current.value,
        genero: gen
      }

      setPacientes([...pacientesData,datosPaciente])
      localStorage.setItem("pacientes",JSON.stringify(pacientes));
    }

  }

  const abrirModalBorrar = (indice)=>{
    setPacienteActual(indice);
    toggleModal();
  }

  const borrar = () =>{
    const pacientesLocal = localStorage.getItem("pacientes");
    let pacientesData = JSON.parse(pacientesLocal);
    pacientesData.splice(pacienteActual,1);
    setPacientes(pacientesData);
    localStorage.setItem("pacientes",JSON.stringify(pacientesData));
    toggleModal();
  }

  return(
    <div className='container'>
      <div className='titulo h4 mt-5'style={{textAlign:"center"}} >FORMULARIO DE CITAS MÉDICAS</div>
      <div className='registro row align-content-center justify-content-center'>
        <div className='cuadro col-md-8 row mt-2  justify-content-center p-4' style={{backgroundColor:"#383F4C",alignContent:"flex-start"}}>
          <div className='tituloCuadro col-md-12 mt-2 h4'style={{textAlign:"center",color:"white"}}>HACER UNA CITA</div>
          <div className='datosCuadro col-md-12 row mt-3'>
            <div className='col-md-5 mb-4'>
              <div className='nombre form'>
                <label style={{color:"white"}}>Nombre del Paciente</label>
                <input ref={nombreRef} type='text' class="form-control"/>
              </div>
            </div>
            <div className='col-md-2 mb-4'></div>
            <div className='col-md-5 mb-4'>
              <div className='fecha form'>
                <label style={{color:"white"}}>Seleccionar fecha</label>
                <input ref={fechaRef} type='date' min={strFechaHoy} class="form-control" />   
              </div>
            </div>
            <div className='col-md-5 mb-4'>
              <div className='dni form'>
                <label style={{color:"white"}}>DNI</label>
                <input ref={dniRef} type='text' class="form-control" placeholder=""/>
              </div>
            </div>
            <div className='col-md-2 mb-4'></div>
            <div className='col-md-5 mb-4'>
              <div className='hora form'>
                <label style={{color:"white"}}>Hora</label>
                <input ref={horaRef} type='time' class="form-control" />
              </div>
            </div>
            <div className='col-md-5 mb-4'>
              <div className='sintomas form'>
                <label style={{color:"white"}}>Síntomas</label>
                <input ref={sintomasRef} type='text' class="form-control"  placeholder=""/>
              </div>
            </div>
            <div className='col-md-2 mb-4'></div>
            <div className='col-md-5 mb-4'>
              <div className='genero form'>
                <label style={{color:"white"}}>Género</label>
                <select ref={generoRef} class="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                  <option selected>--</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                </select>
              </div>
            </div>
          </div>
          <div className='botonCuadro col-md-4 justify-content-center row mt-3'>
            <button type="button" class="btn btn-warning col-md-12" 
            style={{color:"white",paddingLeft:"15px",paddingRight:"15px",fontWeight:"bold",backgroundColor:"orange"}}
            onClick={()=>{agendar()}}
            >Agendar Cita</button>
          </div>
        </div>
      </div>
      <div className='resultados row align-content-center justify-content-center mt-3'>
        <div className='col-md-8 row' style={{justifyContent:"space-between"}}>
          {pacientes.map((item,index)=>{
            return(
              <div className='col-md-6 row mt-1 p-2 row' style={{backgroundColor:"#383F4C",alignContent:"flex-start"}}>
                <label style={{color:"white"}}>Nombre: <b>{item.nombre}</b></label>
                <label style={{color:"white"}}>DNI: <b>{item.dni}</b></label>
                <label style={{color:"white"}}>Síntomas:</label>
                <div className='col-md-12'>
                  <input type='text' class="form-control" disabled="true" value={item.sintomas}></input>
                </div>
                <label style={{color:"white"}}>Género:</label>
                <div className='col-md-12'>
                  <input type='text' class="form-control" disabled="true" value={item.genero}></input>
                </div>
                <label style={{color:"white"}}>Fecha:</label>
                <div className='col-md-12'>
                  <input type='text' class="form-control" disabled="true" value={item.fecha}></input>
                </div>
                <label style={{color:"white"}}>Hora:</label>
                <div className='col-md-12'>
                  <input type='text' class="form-control" disabled="true" value={item.hora}></input>
                </div>
                <div className='botonCuadro col-md-12 justify-content-center row mt-3'>
                  <button type="button" class="btn btn-warning col-md-4" 
                  style={{color:"white",paddingLeft:"10px",paddingRight:"10px",fontWeight:"bold",backgroundColor:"orange"}}
                  onClick={()=>{abrirModalBorrar(index)}}
                  >Borrar</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {openModalBorrar && (
        <div className='modalCustom'>
          <div className='overlayCustom'></div>
          <div className='modal-contentCustom'>
            <h3 style={{textAlign:'center',color:"#383F4C",fontWeight:"bold"}}>Borrar Cita</h3>
            <h6>¿Está seguro de eliminar la cita seleccionada?</h6>
            <div className='row' style={{justifyContent:"space-between"}}>
              <div className='col-md-6 justify-content-center row'><button className='btn btn-primary' onClick={()=>{borrar()}}>Borrar</button></div>
              <div className='col-md-6 justify-content-center row'><button className='btn btn-secondary' onClick={()=>{toggleModal()}}>Cancelar</button></div>
            </div>
          </div>
        </div>
      )}
      {openModalRegistro && (
        <div className='modalCustom'>
          <div className='overlayCustom'></div>
          <div className='modal-contentCustom'>
            <h6 style={{textAlign:"center"}}>{mensajeErrorRegistro}</h6>
            <div className='row' style={{justifyContent:"center"}}>
              <div className='col-md-6 justify-content-center row mt-2'><button className='btn btn-primary' onClick={()=>{toggleModalRegistro()}}>Entendido</button></div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App;
