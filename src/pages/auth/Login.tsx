import Lottie from 'lottie-react';
import lottieLogin from '../../assets/login.json';
import LoginFrom from '@/features/auth/LoginFrom';

export default function Login() {
  return (
    <>
      <section className="h-screen flex">
        <div className='w-full h-full bg-secondary/95 flex items-center justify-center'>
          <Lottie animationData={lottieLogin} loop={true} className='w-3/4' />
        </div>
        <div className='w-full h-full bg-secondary flex items-center justify-center  shadow-[-10px_0px_50px_rgba(0,0,0,0.3)]'>
          <LoginFrom />
        </div>
      </section>
    </>
  )
}
