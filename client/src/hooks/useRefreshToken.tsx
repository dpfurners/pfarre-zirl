import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/token/refresh", {
      withCredentials: true,
    });
    setAuth(() => {
      return {
        username: response.data.username,
        roles: response.data.roles,
        accessToken: response.data.access_token,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
