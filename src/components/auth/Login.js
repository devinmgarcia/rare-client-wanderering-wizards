import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import "../../components/Rare.css"
import rareLogo from "../../images/rarerLogo.png"
const api = "https://rare-serverer.herokuapp.com"

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`${api}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("rare_user_id", res.token )
                    localStorage.setItem("rare_admin", res.admin )
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    {/* <h1 className="rareLogo">Rarerererer</h1> */}
                    <div className="rareLogoImage">
                    <img src={rareLogo} />
                    </div>
                    
                    <fieldset>
                        <input ref={username} type="text" id="username" className="form-control" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Don't have an account yet? Click here to sign up!</Link>
            </section>
        </main>
    )
}
