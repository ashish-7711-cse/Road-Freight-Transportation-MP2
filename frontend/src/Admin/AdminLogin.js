import React,{useState, useEffect} from 'react';
import "../Customer/CustomerSignin.css";
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
const AdminLogin = ({history}) => {
    // useEffect(() => {
    //      function fetchCustomer() {
    //       const response = sessionStorage.getItem("authToken");
    //       if(response.length > 0)
    //         sessionStorage.clear();
    //     }
    //     fetchCustomer();
    //   }, []);
    let [userData, setUserData] = useState({})
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getToSignUp = e => {
        e.preventDefault()
        history.push('/customerSignup')
    }
    const handleChangeEvent = (e, title) => {
        let value = e.target.value
        setUserData({ ...userData, [title]: value })

    }
    
    const submitData = async(e) => {
        e.preventDefault()
        console.log(userData)
        const res =await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               email: email, password: password
            })
        });
        const data = await res.json();
        console.log(data)
        if (data.error) {
            window.alert("Unsucessful Login");
            history.push('/customerSignup')
        } else {
            window.alert("Success");
            let { token } = data;
            console.log(token);
            sessionStorage.setItem('authTokenAdmin', token)
            console.log(sessionStorage.getItem('authToken'));
            history.push("/customerDash");
        }
    }
    return (
        <>
            <Navbar />
            <div className="container my-5 px-0 z-depth-1">
                <section className="p-5 my-md-5 text-center sec">

                    <form className="my-5 mx-md-5" action="">

                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="card">
                                    <div className="card-body">
                                        <form className="text-center col_clor" action="#!">

                                            <h3 className="font-weight-bold my-4 pb-2 text-center dark-grey-text">Log In Customer</h3>
                                            <input type="email" id="defaultSubscriptionFormPassword" className="form-control mb-4" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                            <input type="password" id="defaultSubscriptionFormEmail" className="form-control" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                            <small id="passwordHelpBlock" className="form-text text-right blue-text">
                                                <a href="" onClick={e=>getToSignUp(e)}>SIGN UP?</a>
                                            </small>

                                            <div className="text-center">
                                                <button type="button" className="btn btn-warning btn-rounded my-4 waves-effect" onClick={e=>submitData(e)}>LOGIN</button>
                                            </div>

                                        </form>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </form>

                </section>
            </div>
            <Footer />
        </>
    )
}
export default AdminLogin;
