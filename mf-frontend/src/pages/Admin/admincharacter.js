import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AdminCharacter = () => {
    const account = JSON.parse(localStorage.getItem('ADMIN_DATA'));
    const history = useNavigate();
    useEffect(() => {
        if(!account) {
        history('/');
        }
    }, [account, history]);

    return(
        <div className="admin-character-container">
            <h1>Admin Character</h1>
        </div>
    );
}

export default AdminCharacter;