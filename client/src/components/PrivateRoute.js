import { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import ModalLogin from '../components/Modal/ModalLogin'
import { UserContext } from "../contexts/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useContext(UserContext);
  const { isLogin } = state;
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/"/>
      }
    />
  );
};

export default PrivateRoute;