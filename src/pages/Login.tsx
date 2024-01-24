import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { Button } from "antd";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data:any) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
      console.log(userInfo);
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    
    dispatch(setUser({ user: user, token: res.data.accessToken }));
    if(user){
    navigate("/")
    }
  };
  return (
    <div style={{backgroundColor:"#001529", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:'center' ,}}>
      <h1 style={{color:"white", marginBottom:"20px"}}>Login</h1>
      <form style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:'center', gap:"10px",  }} className="bg" onSubmit={handleSubmit(onSubmit)}>

      <div>
        <input placeholder="username"  style={{padding:"10px", width:'300px', borderRadius:"10px"}} type="text" id="id" {...register('username')} />
      </div>
      <div>
        <input placeholder="password"  style={{padding:"10px", width:'300px', borderRadius:"10px"}} type="text" id="id" {...register('password')} />
      </div>
      <Button htmlType="submit">Register</Button>
    </form>
    </div>
  );
};

export default Login;
