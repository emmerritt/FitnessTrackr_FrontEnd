import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button'

const Home = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.picsum.photos/id/669/1920/1080.jpg?blur=5&hmac=J7R0jS8O2SF7aAOPdzrJPCriRHO27y0rbKd00nQGTXA"
          alt="First slide"
        />
        <Carousel.Caption className='carousel-caption'>
            <h3>Track your fitness habits</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Button variant="outline-light" size="lg" href='/routines'>
                Get Started
            </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.picsum.photos/id/317/1920/1080.jpg?blur=5&hmac=m-9ArpPXrJcNEGI93yqewRWvX-eWbuRbCecA2IroBtI"
          alt="Second slide"
        />
        <Carousel.Caption className='carousel-caption'>
            <h3>Build your routines</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button variant="outline-light" size="lg" href='/routines'>
                Browse Routines
            </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.picsum.photos/id/557/1920/1080.jpg?blur=5&hmac=xPMs-ji0awWd_5vAs1MKQLGoOHh9w1xlAhV4iTxCIj0"
          alt="Third slide"
        />
        <Carousel.Caption className='carousel-caption'>
            <h3>Plan your activities</h3>
            <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            <Button variant="outline-light" size="lg" href='/activities'>
                Browse Activities
            </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;