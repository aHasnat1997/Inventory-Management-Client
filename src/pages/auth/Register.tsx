import Lottie from 'lottie-react';
import lottieRegister from '../../assets/register.json';
import RegisterFrom from '@/features/auth/RegisterFrom';

export default function Register() {
  return (
    <>
      <section className="h-screen flex">
        <div className='w-full h-full bg-secondary flex items-center justify-center'>
          <RegisterFrom />
        </div>
        <div className='w-full h-full bg-secondary/95 flex items-center justify-center shadow-[-10px_0px_50px_rgba(0,0,0,0.3)]'>
          <Lottie animationData={lottieRegister} loop={true} className='w-3/4' />
        </div>
      </section>
    </>
  )
}
