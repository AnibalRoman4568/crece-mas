import { useEffect,useState, useRef } from 'react';
//import logo from './logo.svg';
//import './estilos.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  
  const [pacientes,setPacientes] = useState([]);
  localStorage.setItem("pacientes",JSON.stringify(pacientes));

  const nombreRef = useRef(null);
  const fechaRef= useRef(null);
  const dniRef = useRef(null);
  const horaRef = useRef(null);
  const sintomasRef = useRef(null);
  const generoRef = useRef(null);

  const agendar = () =>{

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

    //alert(`Los pacientes ${JSON.stringify(pacientes)}`);
  }

  const borrar = (indice) =>{
    //pacientes.splice(indice,1)
    const pacientesLocal = localStorage.getItem("pacientes");
    let pacientesData = JSON.parse(pacientesLocal);
    pacientesData.splice(indice,1)
    setPacientes(pacientesData)
    localStorage.setItem("pacientes",JSON.stringify(pacientesData));
    return;
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
      <div className='resultados row align-content-center justify-content-center mt-3'>
        <div className='col-md-8 row' style={{justifyContent:"space-between"}}>
          {pacientes.map((item,index)=>{
            return(
              <div className='col-md-6 row mt-1 p-2 row' style={{backgroundColor:"#383F4C",alignContent:"flex-start"}}>
                <label style={{color:"white"}}>Nombre: <b>{item.nombre}</b></label>
                <label style={{color:"white"}}>DNI: <b>{item.dni}</b></label>
                <label style={{color:"white"}}>Sintomas:</label>
                <div className='col-md-12'>
                  <input type='text' class="form-control" disabled="true" value={item.sintomas}></input>
                </div>
                <label style={{color:"white"}}>Genero:</label>
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
                  onClick={()=>{borrar(index)}}
                  >Borrar</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App;
