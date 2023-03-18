import { Injectable, NgZone } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import firebase from 'firebase/compat';
import { Patient} from '../models/patient';
import { deleteDoc, getDoc, getFirestore, updateDoc, getDocs } from 'firebase/firestore';
import { User } from '../models/user';

export class patientservice{
    patientdata:any
    constructor(
        private firestore:Firestore,
        private router:Router,
        private ngzone:NgZone
    ) {}
    
    setPatient(patient:any){
       
        const patientref = doc(this.firestore,`patients/${patient.uid}`);
        const displayname = firebase.auth().currentUser?.displayName
        const id = firebase.auth().currentUser?.uid
        patient.uid = id
        const Image = firebase.auth().currentUser?.photoURL
        patient.image_fieldurl = Image
        const patientData: Patient = {
                   uid:patient.uid,
                   display_name:patient.displayname,
                   Age:patient.Age,
                   Weight:patient.Weight,
                   Phone_No:patient.Phone_No,
                   Ailments:patient.Ailments,
                   Last_Visit:patient.Last_Visit,
                   Pulse:patient.Pulse,
                   Blood_Pressure:patient.Blood_Pressure,
                   Notes:patient.Notes,
                   Medication_name:patient.Medication_name,
                   Medication_Dose:patient.Medication_Dose,
                   image_fieldurl:patient.image_fieldurl
                }
                return setDoc(patientref,patientData,{
                    merge:true,
                });

    }
    
    async deletePatient(){
        const db = getFirestore()
        const ID = firebase.auth().currentUser?.uid
        const docref = doc(db,'patients','ID')
        await deleteDoc(docref).then(() =>{
          console.log('Patient deleted succesfully')
        }).catch(error =>{
         console.log(error)
        })
     }

    async UpdatePatient(patientdata:any){
        const db = getFirestore()
        const ID = firebase.auth().currentUser?.uid
        const docref = doc(db,'patients','ID')
        await updateDoc(docref,patientdata).then(docref =>{
            console.log('Patient information has been updated')
        }).catch(error =>{
            console.log(error)
        })
        }

    async GetPatient(i_d:string){
        const db = getFirestore()
        const docref = doc(db,'patients','i_d')
        const docsnap = await getDoc(docref)
        if(docsnap.exists()){
            console.log('Patient Data:',docsnap.data())
        }else{
            console.log('No such documents')
        }
    }

    async GetAllPatients(){
        const db = getFirestore()
        const colref = collection(db,'patients')
        const docsnap = await getDocs(colref)
        docsnap.forEach(doc =>{
            console.log(doc.data())
        })
    }
}


