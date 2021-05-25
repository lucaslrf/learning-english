import decode from "jwt-decode";
import {  useHistory } from "react-router-dom";

const TOKEN_KEY = "@trip-quest";

const AuthService = {

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  },

  isTokenExpired(token) {
    try {
      const decoded = decode(token) || {};
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getTokenDecode() {
    const token = this.getToken();
    
    if(token === null) return
    
    return decode(token);
  },

  getNome() {
    const usuario = this.getUsuario()

    if(usuario === null) return ""

    return usuario?.nome;
  },

  getTipoUsuario() {
    const payload = this.getTokenDecode()

    if(payload === null) return

    console.log('payload maroto: ', payload)

    if(payload.role.includes('student')){
      return 'student';
    }else if(payload.role.includes('teacher')){
      return 'teacher';
    }else if(payload.role.includes('admin')){
      return 'admin';
    }
    
    return;
  },
};

export default AuthService;