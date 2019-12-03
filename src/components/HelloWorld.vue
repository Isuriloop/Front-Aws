<template>
<div class="body-index">
<v-container>

<div align="center" >
  <v-card :elevation=24 class="card" style="margin: 5%" >
  <v-container fluid>
    <v-row>
      <v-col cols="1" sm="6">
        <br><br><br><br>
        <img src="../assets/logo.png" width="250px" height="190px">
      </v-col>

      <v-col cols="6" sm="5">
         <div class="login">
           <br><br>
        <font face="Segoe UI Light" size="5px"><b>Bienvenido</b></font>
        <br><br><br>
        
        <v-text-field 
        label="Usuario" 
        v-model="usuario"
        color="#38b6ff"
        class="font1"
        filled
        rounded
        dense
        outlined
        
        >
        </v-text-field>
         <v-text-field
         
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name=""
            label="Contraseña"
          
            color="#38b6ff"
            filled
            rounded
            dense
            outlined
            @click:append="show1 = !show1"
          ></v-text-field>
          
  <div class="text-center">
     <v-btn rounded color="primary" width="120px" @click="login()">
       <font face="Calibri" size="2" style="text-transform: capitalize;">Login</font></v-btn>

  
   
  </div>
        
        </div>
      </v-col>
    </v-row>
  </v-container>
        
  </v-card>
</div>
</v-container>

</div>

</template>






<script>
import { API } from "../Servicios/axios";

export default {
  
  name: "HelloWorld",

  data() {
    return {
      dialog: false,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      usuario:"",
      password: "",
      rules: {
        required: value => !!value || "Requerido.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
    props: {
    source: String
  },
  methods:{

    login(){

      API.post(
        "v1/login/",
        {
          username: this.usuario,
          password: this.password

        }
      ).then(response => {
          alert("Iniciaste correctamente", response);
          //console.log(response.data)
          localStorage.setItem('token',response.data.token);
          (window.location.href = "http://localhost:8080/Home/");
        })
        .catch(error => {
          alert("error",error)
        });
    }

  },
    mounted() {
    
  }
};
</script >




<style scoped>
.card {
  width: 85%;
  height: 480px;
  border-radius:0px !important;
}
.font1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

}
.body-index {
  background: url('../assets/minimal08.jpg') no-repeat ;
  background-size: 100%;
  width: 100%;
  height: 100%;
}
.btnmargin {
  margin-left: 10px;
}
</style>