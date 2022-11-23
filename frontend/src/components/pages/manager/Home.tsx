import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import WelcomeBanner from '../../organisms/manager/WelcomeBanner';

export default function ManagerHome() {
    const { token } = useContext(AuthContext);
    console.log(token);
    return (
        <div>
            <h1> HOME</h1>
        </div>
    );
}
