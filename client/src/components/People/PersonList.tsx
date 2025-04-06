import { useMemo, useState } from "react"
import { People } from "../../types/types"
import Person from "./Person"
import Profile from "./Profile"
import { Box, TextField } from "@mui/material"


type PresonListType = {
    peoples: People[]
}

const PersonList:React.FC<PresonListType> = ({peoples}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPeople = useMemo(() => {
    return peoples.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [peoples, searchTerm]);

    return (
      <><Box display="flex" justifyContent="center" my={2}>
        <TextField
          label="Search by name or country"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
      </Box><div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredPeople.map(person => (
            <Person people={person} key={person.id} />
          ))}
          <Profile />
        </div></>
    )
}

export default PersonList;