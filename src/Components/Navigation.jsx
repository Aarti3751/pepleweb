
import { FaRegBell } from "react-icons/fa";
import img from '../img/profile.png'
const Navigation = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-md">
                <div className="navbar-brand fw-bold fs-2" style={{ color: '#6941C6' }}>
                    PEOPLE.CO
                </div>
                <div className="d-flex flex-row align-items-center">
                    <FaRegBell size={24} style={{ marginRight: '1rem' }} />
                    <img src={img} alt="Profile" />
                    <div className="pt-1 ms-2" style={{ fontWeight: '600' }}>
                        Jane Doe
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navigation