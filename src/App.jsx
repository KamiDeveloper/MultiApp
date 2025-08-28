import AnimatedGradientBackground from './assets/components/background/AnimatedGradientBackground'
import './App.css'
import Carousel from './assets/components/layout/Carousel'
import Layout from './assets/components/layout/Layout'

function App() {

  return (
    <>
      <div className="App">
        <AnimatedGradientBackground>
          <Layout>
            <Carousel />
          </Layout>
        </AnimatedGradientBackground>
      </div>
    </>
  )
}

export default App
