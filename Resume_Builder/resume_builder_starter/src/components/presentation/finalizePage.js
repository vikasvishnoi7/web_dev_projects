import React from "react";
import ResumePreview from './resumePreview'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { connect } from "react-redux";
// import { useFirestore } from 'react-redux-firebase'
import { getDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
let firebaseConfig = require("../../secrets");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Finalize(props) {

    let educationSection = props.education
    let contactSection = props.contact
    let documentd = props.document

    // const firestore = useFirestore();

    const saveToDatabase = async () => {

        // add or update to firestore
        // let user = await firestore.collection('users').doc(props.auth.uid).get()

        const docRef = doc(db, "users", props.auth.uid);
        let user = await getDoc(docRef);

        // console.log('user', user);
        user = user.data()
        // console.log('user.data()',user);
        let obj = null;

        // console.log("props.auth.uid", props.auth.uid)
        // console.log("documentd.id", props.document.id)

        if (user?.resumeIds != undefined) {
            obj = { ...user.resumeIds, [documentd.id]: { educationSection: educationSection, contactSection: contactSection, document: documentd } }
        } else {
            obj = { [documentd.id]: { educationSection: educationSection, contactSection: contactSection, document: documentd } }
        }


        const docref = doc(db, 'users', props.auth.uid);
        await updateDoc(docref, {
            resumeIds: obj
        });

        // await firestore.collection('users').doc(props.auth.uid).update({
        //     resumeIds: obj
        // })
    }
    const downloadResume = () => {
        const input = document.getElementById('resumePreview');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "mm", "a4");
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                // pdf.output('dataurlnewwindow');
                pdf.save("resume.pdf");
            }).catch(function (error) {
                console.log(error)
            })
    }
    return (
        <div className="container full finalize-page" >
            <div className="funnel-section ">
                <div className="finalize-preview-card " id="resumePreview" >
                    <ResumePreview contactSection={contactSection} educationSection={educationSection} skinCd={props?.document?.skinCd}></ResumePreview>
                </div>
                <div className="finalize-settings center">


                    <div className=" download-resume resume-options">
                        <p className="no-margin"  >
                            Download Resume As PdF
                        </p>
                        <a style={{ cursor: 'pointer' }} onClick={downloadResume}  >download Resume</a>
                    </div>
                    <div className=" download-resume resume-options">
                        <p className="no-margin"  >
                            Save to Database
                        </p>
                        <a style={{ cursor: 'pointer' }} onClick={saveToDatabase}  >Save to Database</a>
                    </div>
                </div>
            </div>
        </div>
    )


}

function mapStateToProps(store) {
    return {
        document: store.document,
        contact: store.contact,
        education: store.education,
        auth: store.firebase.auth
    }
}

export default connect(mapStateToProps)(Finalize)

