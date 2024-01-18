import {Container, Card,Icon, Image, Button, CardGroup} from 'semantic-ui-react'
import './App.css'
import { useEffect, useRef, useState } from 'react'

function App() {
  const videoDiv = useRef()
  const fotoDiv = useRef()
  const [hayfoto, setHayfoto] = useState(false)
  
  const verCamara = () => {
    navigator.mediaDevices.getUserMedia({video: {width:1920, height:1080}})
    .then(stream => {
      let miVideo = videoDiv.current
      miVideo.srcObject= stream;
      miVideo.play()
    }).catch(err => {
      console.log(err)
    })
  }

  const tomarFoto = () => {
    const w = 430
    const h = w / (16 / 9)

    let video = videoDiv.current
    let foto = fotoDiv.current

    foto.width = w
    foto.height = h
    let context = foto.getContext('2d')
    context.drawImage(video, 0, 0, w, h);
    setHayfoto(true)
  }

  const cerrarFotos = () => {
    let f = fotoDiv.current
    let context = f.getContext('2d')
    context.clearRect(0, 0, f.width, f.height)
    setHayfoto(false)
  }
  
  useEffect (() => {
    verCamara(),
    [videoDiv]
  })
  return (
    <>
      <div>
        <div>
          <h2>
            Aplicacion de tomar fotos
          </h2>
        </div>
      <Container className='miApp' fluid textAlign='center'> 
        <CardGroup centered>
        <Card >
        <video ref={videoDiv}></video>
        <Card.Content>
          <Button color='teal' onClick={tomarFoto}><Icon name='camera'></Icon>Tomar foto</Button>
        </Card.Content>
        </Card>
         <Card >
        <canvas ref={fotoDiv}></canvas>
        <Card.Content>
          <Button onClick={cerrarFotos} color='red'><Icon name='close'></Icon>Cerrar</Button>
        </Card.Content>
        </Card>
        </CardGroup>
        </Container>7
        </div>
    </>
  )
}

export default App
