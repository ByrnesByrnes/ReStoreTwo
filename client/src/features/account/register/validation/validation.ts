const emailValidation = /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

const passwordValidation = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;

export { emailValidation, passwordValidation };
