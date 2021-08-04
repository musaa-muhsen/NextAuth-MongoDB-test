export const deleteUser = async (userId) => {     
    try {
        await fetch(`/api/users/${userId}`, {
            method: "Delete"
        });
    } catch (error) {
        console.log(error)
    }
}