import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import Aktarim from './components/Aktarim';
import Takvim from './components/Takvim';


function Main() {
    const [activeTab, setActiveTab] = useState('aktarim');

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-white bg-white shadow-sm'>
                <div class="collapse navbar-collapse justify-content-md-center">
                    <ul class="navbar-nav p-2">
                        <li className="nav-item">
                            <a
                                className={`top-btn rounded-0 ${activeTab === 'aktarim' ? 'active' : ''}`}
                                onClick={() => setActiveTab('aktarim')}
                                href="#aktarim"
                            >
                                AKTARIM
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`top-btn rounded-0 ${activeTab === 'takvim' ? 'active' : ''}`}
                                onClick={() => setActiveTab('takvim')}
                                href="#takvim"
                            >
                                TAKVİM
                            </a>
                        </li>
                    </ul>
                </div>

            </nav>
            {/* Tab Content */}
            <div className="container mt-4 pt-2">
                {activeTab === 'aktarim' && (
                    <Aktarim />
                )}
                {activeTab === 'takvim' && (
                    <Takvim />
                )}
            </div>
        </div>
    );
}

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Main />
        </React.StrictMode>
    );
}
