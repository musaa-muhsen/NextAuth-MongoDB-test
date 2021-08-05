import fetch from 'isomorphic-unfetch';


export const deleteUser = async (userId) => {     
    try {
        await fetch(`/api/users/${userId}`, {
            method: "Delete"
        });
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (id) => {
    try {
        const res = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
    } catch (error) {
        console.log(error);
    }
}

export const createUser = async () => {
    try {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        //toggleChecked()
    } catch (error) {
        console.log(error);
    }
}