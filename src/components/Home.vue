<template>


<div class="body">
<div align="center" >
  <v-card class="overflow-hidden" style="border-radius:0px !important;">
       
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-toolbar-title> Lista de Alumnos</v-toolbar-title>

      <v-spacer></v-spacer>
<v-text-field
            label="Buscar"
            single-line
             v-model="nombrebusqueda"
            
           
          ></v-text-field>
      <v-btn icon>
        <v-icon @click="filtronnombre()">mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

    </v-app-bar>

<br><br><br>




  </v-card>
  
<div >


  <v-row >
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
          <v-row style="margin-left:125px;">
    <v-col cols="18" sm="6" md="3">
        <v-select
          :items="['Ingenieria en Desarrollo de Software', 'Ingenieria  en Biomedica', 'Ingenieria Petrolera', 'Ingenieria en Energia','Ingenieria en Manofacturas','Ingenieria en Mecatronica', 'Ingenieria Ambiental']"
          label="Carrera*"
          v-model="carrerabusqueda"
          height="25px"
          width="200px"
           ></v-select>
    </v-col>
            <v-col cols="12" sm="6" md="2">
<v-btn color="error"  height="40px" @click="filtrocarrera()"  style="text-transform: capitalize;">filtrar por carrera</v-btn>
    </v-col>

<v-col cols="18" sm="6" md="1">
   <v-text-field label="Edad*"  v-model="edadbusqueda" required height="25px"></v-text-field>
</v-col>
<v-col cols="12" sm="6" md="2">
<v-btn color="success"  height="40px" @click="filtroedad()"  style="text-transform: capitalize;">filtrar por Edad</v-btn>
    </v-col>

        <v-col cols="12" sm="6" md="3">
<v-btn color="primary" dark v-on="on" style="margin-left:0px; text-transform: capitalize;" height="40px" > Registrar</v-btn>
    </v-col>
  </v-row>
        
      </template>
      
      <v-card>
        <v-card-title>
          <span class="headline">Registrar alumno</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Nombre*" v-model="nombre" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Apellido Paterno*" v-model="apellidop" hint=""></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Apellido Materno*"
                  hint=""
                  v-model="apellidom"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Edad*"  v-model="edad" required></v-text-field>
              </v-col>
              <v-col cols="12" >
                <v-select
                  :items="['Ingenieria en Desarrollo de Software', 'Ingenieria  en Biomedica', 'Ingenieria Petrolera', 'Ingenieria en Energia','Ingenieria en Manofacturas','Ingenieria en Mecatronica', 'Ingenieria Ambiental']"
                  label="Carrera*"
                  required
                  v-model="carrera"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Femenino', 'Masculino']"
                  label="Sexo*"
                  v-model="sexo"
                  required
                ></v-select>
              </v-col>
               <v-col cols="12" sm="6">
                <v-text-field label="Direccion*"  v-model="direccion" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="save()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</div>
<v-card :elevation=24 class="card" style="margin: 1%" width="80%"  outlined>
  <div align="left"><h1>Alumnos</h1></div>

  <table class="table" border="0" cellspacing="0">
    <tr >

       <td><font face="Segoe UI" size="3">Nombre</font></td>
       <td> <font face="Segoe UI" size="3">Apellido Paterno  </font></td>
       <td> <font face="Segoe UI" size="3"> Apellido Materno  </font></td>
       <td><font face="Segoe UI" size="3">Edad  </font></td>
       <td> <font face="Segoe UI" size="3"> Sexo  </font></td>
       <td><font face="Segoe UI" size="3"> Carrera </font></td>
       <td width="18%"><font face="Segoe UI" size="3"> Acciones</font></td>
      
    </tr>
        <br>
    <tr v-for="datos of datas" :key="datos.id"  class="th">
        <td class="user" ><font face="Segoe UI" size="2.5"> {{ datos.nombre}} </font> </td>
        <td ><font face="Segoe UI" size="2.5"> {{ datos.apellidoPaterno}}  </font></td>
        <td><font face="Segoe UI" size="2.5"> {{ datos.apellidoMaterno}} </font></td>
        <td><font face="Segoe UI" size="2.5"> {{ datos.edad}} </font> </td>
        <td><font face="Segoe UI" size="2.5"> {{ datos.sexo}} </font> </td> 
        <td> <font face="Segoe UI" size="2.5">{{ datos.carrera}} </font></td> 
        <td>   
          <v-dialog v-model="dialog2" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                   <v-btn  small color="primary"  dark v-on="on"
        @click="getItem(datos)" fab="true" width="35px" height="35px"><img src="../assets/edit.png" width="12px" height="12px"></v-btn>
        
      </template>
      
      <v-card>
        <v-card-title>
          <span class="headline">Editar alumno</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Nombre*" v-model="nombreup" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Apellido Paterno*" v-model="apellidopup" hint=""></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Apellido Materno*"
                  hint=""
                  v-model="apellidomup"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Edad*"  v-model="edadup" required></v-text-field>
              </v-col>
              <v-col cols="12" >
                <v-select
                  :items="['Ingenieria en Desarrollo de Software', 'Ingenieria  en Biomedica', 'Ingenieria Petrolera', 'Ingenieria en Energia','Ingenieria en Manofacturas','Ingenieria en Mecatronica', 'Ingenieria Ambiental']"
                  label="Carrera*"
                  required
                  v-model="carreraup"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Femenino', 'Masculino']"
                  label="Sexo*"
                  v-model="sexoup"
                  required
                ></v-select>
              </v-col>
               <v-col cols="12" sm="6">
                <v-text-field label="Direccion*"  v-model="direccionup" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="dialog2 = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="edit()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
          </v-dialog>
          

        <v-btn small color="error" 
        @click="deleted(datos)"  fab="true" width="35px" height="35px" style="margin-left: 20px;" outline="false"><img src="../assets/delete.png" width="12px" height="12px"></v-btn>
</td>

        <br><br>
    </tr>
  </table >
</v-card>

<br><br>
</div>
</div>
</template>

<script>
import { API } from "../Servicios/axios";
import { URLSearchParams } from "url";

export default {
  data() {
    return {
      dialog: false,
      dialog2: false,
      datas: [],
      nombre: "",
      apellidop: "",
      apellidom: "",
      edad: "",
      sexo: "",
      direccion: "",
      carrera: "",
      nombreup: "",
      apellidopup: "",
      apellidomup: "",
      edadup: "",
      sexoup: "",
      direccionup: "",
      carreraup: "",
      id: "",
      carrerabusqueda: "",
      edadbusqueda: "",
      nombrebusqueda: "",
      carrerafilter: "",
      token: localStorage.getItem("token")
    };
  },
  props: {
    source: String
  },

  created() {
    this.initialize();
  },

  methods: {
    save() {
      const header = {
        headers: {
          Authorization: "Token " + this.token
        }
      };
      API.post(
        "v1/alumno/alumno_lista/",
        {
          nombre: this.nombre,
          apellidoPaterno: this.apellidop,
          apellidoMaterno: this.apellidom,
          edad: this.edad,
          sexo: this.sexo,
          direccion: this.direccion,
          carrera: this.carrera
        },
        header
      )
        .then(response => {
          alert("Te has registrado con Exito!", response);
          (this.nombre = null),
            (this.apellidop = null),
            (this.apellidom = null),
            (this.adad = null),
            (this.sexo = null),
            (this.carrera = null),
            (this.dialog = false)
            //(window.location.href = "awseducateddns.hopto.org/Home/");
                const header = {
      headers: {
        Authorization: "Token " + this.token
      }
    };
    API.get("v1/alumno/alumno_lista/", header).then(response => {
      this.datas = response.data;
      // eslint-disable-next-line no-console
      console.log(this.datas);
    });
        })
        .catch(error => {});
    },

    deleted(datos) {
      const header = {
        headers: {
          Authorization: "Token " + this.token
        }
      };

      API.delete("v1/alumno/alumno_detail/" + datos.id + "/", header)
        .then(response => {
          alert("Borrado con exito", response);
         // window.location.href = "awseducateddns.hopto.org/Home/";
             const header = {
      headers: {
        Authorization: "Token " + this.token
      }
    };
    API.get("v1/alumno/alumno_lista/", header).then(response => {
      this.datas = response.data;
      // eslint-disable-next-line no-console
      console.log(this.datas);
    });
         
        })
        .catch(error => {
          alert("Error", error);
        });
    },
    getItem(datos) {
      this.id = datos.id;
      const header = {
        headers: {
          Authorization: "Token " + this.token
        }
      };
      API.get("v1/alumno/alumno_detail/" + datos.id + "/", header).then(
        response => {
          this.nombreup = response.data.nombre;
          this.apellidopup = response.data.apellidoPaterno;
          this.apellidomup = response.data.apellidoMaterno;
          this.edadup = response.data.edad;
          this.sexoup = response.data.sexo;
          this.carreraup = response.data.carrera;
          this.direccionup = response.data.direccion;

          // eslint-disable-next-line no-console
          console.log("Datos de actualizacion" + this.datas);
        }
      );
    },

    edit() {
      const header = {
        headers: {
          Authorization: "Token " + this.token
        }
      };
      API.put(
        "v1/alumno/alumno_detail/" + this.id + "/",
        {
          nombre: this.nombreup,
          apellidoPaterno: this.apellidopup,
          apellidoMaterno: this.apellidomup,
          edad: this.edadup,
          sexo: this.sexoup,
          direccion: this.direccionup,
          carrera: this.carreraup
        },
        header
      )
        .then(response => {
          alert("Se actualizo correctamente", response);
          (this.dialog2 = false)
            
            //(window.location.href = "awseducateddns.hopto.org/Home/");
                const header = {
      headers: {
        Authorization: "Token " + this.token
      }
    };
    API.get("v1/alumno/alumno_lista/", header).then(response => {
      this.datas = response.data;
      // eslint-disable-next-line no-console
      console.log(this.datas);
    });
        })
        .catch(error => {
          alert("error", error);
        });
    },
    filtronnombre() {
      const header = {
        headers: {
          Authorization: "Token " + this.token
        },
        params: {
          search: this.nombrebusqueda
        }
      };
      API.get("v1/alumno/alumnos_filter/", header)
        .then(response => {
          this.datas = response.data.results;
          this.nombre=null

          // eslint-disable-next-line no-console
          console.log(
            "Datos de Busqueda xdxd" + this.datas,
            response.data.results
          );
        })
        .catch(error => {
          alert("error", error);
        });
    },

    filtrocarrera() {
      const header = {
        headers: {
          Authorization: "Token " + this.token
        },
        params: {
          search: this.carrerabusqueda
        }
      };
      API.get("v1/alumno/alumnos_filter_carrera/", header)
        .then(response => {
          this.datas = response.data.results;
          this.carrerabusqueda=null

          // eslint-disable-next-line no-console
          console.log(
            "Datos de Busqueda xdxd" + this.datas,
            response.data.results
          );
        })
        .catch(error => {
          alert("error", error);
        });
    },

    filtroedad() {
      const header = {
        headers: {
          Authorization: "Token " + this.token
        },
        params: {
          search: this.edadbusqueda
        }
      };
      API.get("v1/alumno/alumnos_filter_edad/", header)
        .then(response => {
          this.datas = response.data.results;
          this.edadbusqueda=null

          // eslint-disable-next-line no-console
          console.log(
            "Datos de Busqueda xdxd" + this.datas,
            response.data.results
          );
        })
        .catch(error => {
          alert("error", error);
        });
    }
  },
  mounted() {
    const header = {
      headers: {
        Authorization: "Token " + this.token
      }
    };
    API.get("v1/alumno/alumno_lista/", header).then(response => {
      this.datas = response.data;
      // eslint-disable-next-line no-console
      console.log(this.datas);
    });
  }
};
</script>
<style scoped>
table {
  margin-top: 20px;
  margin-bottom: 100px;
}

tr,
td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
tr:hover {
  background-color: #f5f5f5;
}
.card {
  border-radius: 0px !important;
}
.body {
  background-color: white;
  width: 100%;
  height: 100%;
}
h1 {
  margin-left: 70px;
  margin-top: 50px;
}
</style>




