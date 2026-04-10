import { login } from "../../../utils/service_managr";
import { LoginForm } from "./login_form";
import { userLoginInterface } from "../../../utils/interfaces";

export default function LoginPage()
{
  const handleLogin = async (data: userLoginInterface) => {
    try {
      const response = await login(data);
      //redirect
    } catch (error) { //TODO handle errors
      console.log("Loginj Failed", error);
    }
  };

  return <LoginForm submitHandler={handleLogin} />;
};
