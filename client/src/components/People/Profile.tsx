import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  deletePeople,
  openDialogProfile,
  updatePeople,
  updateUnsavedPeople,
} from "../../store/peoplesSlice";
import { savePeople } from "../../api/apiAction";
import { useEffect, useState } from "react";

const Profile = () => {
  const { openDialog, currentPeople, historyPeoples } = useSelector(
    (state: RootState) => state.people
  );
  const dispatch = useDispatch<AppDispatch>();
  const [editableName, setEditableName] = useState(currentPeople?.name || "");

  useEffect(() => {
    setEditableName(currentPeople?.name || "");
  }, [currentPeople]);

  const isSavedProfile =
    currentPeople &&
    historyPeoples.some((person) => person.id === currentPeople.id);

  const handleProfile = () => {
    dispatch(openDialogProfile(undefined));
  };

  const handleSavePeople = () => {
    currentPeople && savePeople("/people", currentPeople);
    dispatch(openDialogProfile(undefined));
  };

  const handleDeletePeople = () => {
    currentPeople && dispatch(deletePeople(currentPeople.id));
    dispatch(openDialogProfile(undefined));
  };

  const handleUpdate = () => {
    if (!currentPeople) return;

    const updatedPerson = { ...currentPeople, name: editableName };
    if (isSavedProfile) {
      dispatch(updatePeople(updatedPerson));
    } else {
      dispatch(updateUnsavedPeople(updatedPerson));
    }

    dispatch(openDialogProfile(undefined));
  };

  const HistoryButton = () => {
    if (isSavedProfile) {
      return <Button onClick={handleDeletePeople}>Delete</Button>;
    } else {
      return <Button onClick={handleSavePeople}>Save</Button>;
    }
  };

  if (!currentPeople) return null;

  return (
    <Dialog open={openDialog} onClose={handleProfile}>
      <Card
        sx={{
          padding: "20px",
        }}
      >
        <CardHeader
          title={
            <TextField
              label="Name"
              value={editableName}
              onChange={(e) => setEditableName(e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
            />
          }
          subheader={`${currentPeople.email}| Phone: ${currentPeople.phoneNumber}`}
        />
        <CardMedia
          component="img"
          image={currentPeople.picture.large}
          alt={currentPeople.picture.large}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {currentPeople.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${currentPeople.age.age} - Year of Birth ${currentPeople.age.yearOfBirth}`}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            {currentPeople.address.street}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentPeople.address.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentPeople.address.state}
          </Typography>
        </CardContent>
      </Card>
      <DialogActions>
        <HistoryButton />
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Profile;


