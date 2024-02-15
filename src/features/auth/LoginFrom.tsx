import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email is empty",
  }).email('Input valid email'),
  password: z.string().min(8, {
    message: "Password must 8",
  }),
});

export default function LoginFrom() {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await loginUser(values);
      // console.log('', result);

      if ('data' in result) {
        const info = result.data.doc;
        dispatch(setUser({
          id: info.user._id,
          username: {
            firstName: info.user.username?.firstName,
            lastName: info.user.username?.lastName
          },
          email: info.user.email,
          phone: info.user.phone,
          userImg: info.user.userImg,
          role: info.user.role,
          isActive: info.user.isActive,
          token: info.token,
        }))
        toast({
          title: 'Success',
          description: 'Login Success 👍',
          duration: 2000,
        });
        navigate('/');
      } else if ('error' in result) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const issueMessage = result.error as any
        const errorMessage = issueMessage.data?.issue[0]?.message;
        toast({
          title: 'Error',
          description: `🛑 ${errorMessage}`,
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'An error occurred during login. Please try again.',
        duration: 2000,
      });
    }
  }

  return (
    <section>
      <h2 className='text-6xl font-extrabold text-white'>User Login</h2>
      <div className="mt-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Jon Do" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="***************" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex items-end">
              <Button
                type="submit"
                className="ml-auto bg-transparent border text-white hover:text-black"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="w-full">
        <h2 className="text-white text-center mt-8">
          Don't Have an account?
          <Link
            to='/register'
            className="underline ml-2"
          >
            Register
          </Link>
        </h2>
      </div>
    </section>
  )
}
