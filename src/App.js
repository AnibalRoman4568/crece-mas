import { useRef } from 'react';
//import logo from './logo.svg';
//import './estilos.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  
  let pacientes = [];
  localStorage.setItem("pacientes",JSON.stringify(pacientes));

  const nombreRef = useRef(null);
  const fechaRef= useRef(null);
  const dniRef = useRef(null);
  const horaRef = useRef(null);
  const sintomasRef = useRef(null);
  const generoRef = useRef(null);

  const agendar = () =>{

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

    alert(`Se registra a ${JSON.stringify(datosPaciente)}`);
  }

  return(
    <div className='container'>
      <div className='titulo h4 mt-5'style={{textAlign:"center"}} >FORMULARIO DE CITAS MÉDICAS</div>
      <div className='registro row align-content-center justify-content-center'>
        <div className='cuadro col-md-8 row mt-2  justify-content-center' style={{height:"55vh",backgroundColor:"#383F4C",alignContent:"flex-start"}}>
          <div className='tituloCuadro col-md-12 mt-3 h4'style={{textAlign:"center",color:"white"}}>HACER UNA CITA</div>
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
                <input ref={fechaRef} type='date' class="form-control" />   
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
                <label style={{color:"white"}}>Sintomas</label>
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
      <div className='resultados'></div>
    </div>
  )
}

export default App;
