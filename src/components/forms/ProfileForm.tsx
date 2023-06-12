import React, {useState, useRef} from 'react'

import { Grid, Typography, TextField, Button } from '@mui/material'
import { UserType } from '@/lib/common/Types'
import { ProfileFormData } from '@/lib/common/Types'

interface ProfileFormProps {
    user: UserType,
    handleSubmit: (formData:ProfileFormData) => void,
}

export const ProfileForm = ({user, handleSubmit}:ProfileFormProps) => {

    const initValue = {
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        telephone: user.telephone || "",
    }
    // const [profileFormData, setProfileFormData] = useState<UserFormData>(initValue);
    const [formState, setFormState] = useState<ProfileFormData>(initValue);
    const username = useRef(null);
    const first_name = useRef(null);
    const last_name = useRef(null);
    const telephone = useRef(null);

    const handleFieldChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        const property = target.id.split("field_")[1];
        const value = target.value;

        const newState = {
            ...formState,
            [property]: value,
        };
        setFormState(newState);
    }

    const onSubmitAction = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(formState);
    }


    return (<>
    <form className='profileform' onSubmit={onSubmitAction}>
    <Grid className='form_body editable' item container direction="column"
        px={4} py={2}
        sx={{
            backgroundColor: '#fff',
        }}
    >


        <Grid className='form_body__row' item container
            p={1}
        >
            <Grid className='form_body__row title_wrap' item
                md={4} sx={{ ml:{md:1} }}
            >
                <Typography component="p" variant="subtitle1">
                    {"Username"}
                </Typography>
            </Grid>
            <Grid className='form_body__row value_wrap' item
                md={7}
            >
                <TextField id="field_username" name="field_username" fullWidth variant="outlined"
                    ref={username}
                    value={formState.username} onChange={handleFieldChange}
                />
            </Grid>
        </Grid>

        <Grid className='form_body__row' item container
            p={1}
        >
            <Grid className='form_body__row title_wrap' item
                md={4} sx={{ ml:{md:1} }}
            >
                <Typography component="p" variant="subtitle1">
                    {"First Name"}
                </Typography>
            </Grid>
            <Grid className='form_body__row value_wrap' item
                md={7}
            >
                <TextField id="field_first_name" name="field_first_name" fullWidth variant="outlined"
                    ref={first_name}
                    value={formState.first_name} onChange={handleFieldChange}
                    required
                />
            </Grid>
        </Grid>


        <Grid className='form_body__row' item container
            p={1}
        >
            <Grid className='form_body__row title_wrap' item
                md={4} sx={{ ml:{md:1} }}
            >
                <Typography component="p" variant="subtitle1">
                    {"Last Name"}
                </Typography>
            </Grid>
            <Grid className='form_body__row value_wrap' item
                md={7}
            >
                <TextField id="field_last_name" name="field_last_name" fullWidth variant="outlined"
                    ref={last_name}
                    value={formState.last_name} onChange={handleFieldChange}
                    required
                />
            </Grid>
        </Grid>


        <Grid className='form_body__row' item container
            p={1}
        >
            <Grid className='form_body__row title_wrap' item
                md={4} sx={{ ml:{md:1} }}
            >
                <Typography component="p" variant="subtitle1">
                    {"Telephone"}
                </Typography>
            </Grid>
            <Grid className='form_body__row value_wrap' item
                md={7}
            >
                <TextField id="field_telephone" name="field_telephone" fullWidth variant="outlined"
                    ref={telephone}
                    value={formState.telephone} onChange={handleFieldChange}
                    required
                />
            </Grid>
        </Grid>

        <Button type="submit" variant="contained" fullWidth={true} >
            Save!
        </Button>

    </Grid>
    </form>
</>)
}
