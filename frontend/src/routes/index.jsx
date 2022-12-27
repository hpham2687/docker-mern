import MainForm from "../components/MainForm";
import AddPatients from "../components/AddPatients";
import PatientsList from "../components/PatientsList";


const publicRoutes = [
    { path: '/main/:id', component: MainForm },
    { path: '/addpatients', component: AddPatients },
    { path: '/patientslist', component: PatientsList },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
