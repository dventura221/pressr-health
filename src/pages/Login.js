import LoginButton from '../components/LogInButton'

const Login = () => {
  return (
    <div>
      <h1 className="mainTitle">Welcome to PressR</h1>
      <h2>
        An App where you and your medical provider can track your blood pressure
      </h2>
      <h1>Get Started!</h1>
      <div>
        <LoginButton />
      </div>
      <p className="disclaimer">
        *DISCLAIMER: This app is not HIPAA compliant. This app is meant for
        educational, informational, and proof-of-concept purposes only. This app
        does not provide medical advice. It is not a substitute for professional
        medical advice, diagnosis or treatment. Never ignore professional
        medical advice in seeking treatment because of something you have read
        or recorded on this app. If you think you may have a medical emergency,
        immediately call your doctor or dial 911.*
      </p>
    </div>
  )
}

export default Login
