import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Divider, Grid as MaterialGrid, Typography } from "@mui/material";
import MainBody from "../../components/MainBody";
import api from "../../api";
import { SCROLLBAR_OBJ } from "../../styles";
import Texbox from "./Textbox";
import { useParams } from "react-router";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const Form = styled(MaterialGrid)(({ theme }) => ({
  overflow: "auto",
  ...SCROLLBAR_OBJ,
}));

const AddAnimal = () => {
  let { id } = useParams();
  const [allAnimalInfos, setAllAnimalInfos] = useState({});

  const getData = (data) => (data ? data : "-");

  useEffect(() => {
    api(`/animal/allAnimalInfos/${id}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setAllAnimalInfos(data);
      });
  }, [id]);

  const animals = allAnimalInfos?.Animals?.[0]?.[0];
  const adoptions = allAnimalInfos?.Adoptions?.[0]?.[0];
  const vaccinations = allAnimalInfos?.Vaccinations?.[0]?.[0];
  const attendances = allAnimalInfos?.Attendances?.[0]?.[0];
  console.log(adoptions);

  return (
    <MainBody title="Cadastro de Animal">
      <Form container spacing={3}>
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dados do animal
          </Typography>
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <Texbox title="Nome" description={getData(animals?.name)} />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <Texbox title="Idade" description={getData(animals?.age)} />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <Texbox title="Peso" description={getData(animals?.weight)} />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Texbox
            title="Data de resgate"
            description={getData(animals?.rescueDate)}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Divider light />
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Castração
          </Typography>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Texbox
            title="é Cadastrado"
            description={getData(animals?.isCastrated ? "Sim" : "Não")}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Texbox
            title="Data de castração"
            description={getData(animals?.castrationDate)}
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Texbox
            title="Veterinário que realizou a castração"
            description={getData(animals?.vetName)}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Divider light />
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Adoção
          </Typography>
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <Texbox
            title="Novo nome do animal"
            description={getData(adoptions?.animalNewName)}
          />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <Texbox
            title="Nome do adotante"
            description={getData(adoptions?.adopter?.firstName)}
          />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <Texbox
            title="Telefone do adotante"
            description={getData(adoptions?.adopter?.phoneNumber)}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Divider light />
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Avaliação inicial
          </Typography>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Texbox
            title="Precisou de atendimento médico"
            description={getData(animals?.needAttendance ? "Sim" : "Não")}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <Texbox
            title="Dias em atendimento"
            description={getData(animals?.attendanceDays)}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <Texbox
            title="Motivo do atendimento"
            description={getData(animals?.attendanceReason)}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Divider light />
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Vacinações
          </Typography>
        </Grid>
        {[1].map(() => (
          <>
            <Grid item xs={6} lg={4}>
              <Texbox
                title="Nome do veterinário"
                description={getData(vaccinations?.vetName)}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <Texbox
                title="vacina"
                description={getData(vaccinations?.vaccine?.vaccineName)}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <Texbox
                title="informações"
                description={getData(vaccinations?.informations)}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <Texbox
                title="Data da vacinação"
                description={getData(vaccinations?.vaccineDate)}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Divider light />
            </Grid>
          </>
        ))}
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Atendimentos
          </Typography>
        </Grid>
        {[1, 1].map(() => (
          <>
            <Grid item xs={6} md={6} lg={4}>
              <Texbox
                title="Nome do veterinário"
                description={getData(attendances?.vetName)}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={4}>
              <Texbox
                title="Precisou de atendimento médico"
                description={getData(
                  attendances?.needMedicalAppointment ? "Sim" : "Não"
                )}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={4}>
              <Texbox
                title="Motivo do atendimento"
                description={getData(attendances?.medicalAppointmentReason)}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={4}>
              <Texbox
                title="Precisou de atendimento médico especializado"
                description={getData(
                  attendances?.specialistAttendanceReason ? "Sim" : "Não"
                )}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <Texbox
                title="Motivo do atendimento especializado"
                description={getData(attendances?.specialistAttendanceReason)}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Divider light />
            </Grid>
          </>
        ))}
      </Form>
    </MainBody>
  );
};

export default AddAnimal;
