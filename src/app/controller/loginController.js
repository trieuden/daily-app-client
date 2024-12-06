import react, { useEffect, useState } from "react";

const LoginController = (username, password, userList) => {
    // if (username == '' || password == '') {
    //     return { status: false, value: 'username, password is not null !' };
    // }

    // for (const user of userList) {
    //     if (username.toLowerCase() === user.username.toLowerCase() && password.toLowerCase() === user.password.toLowerCase()) {
    //         return { status: true, value: user.id };
    //     }
    // }

    // return { status: false, value: 'Incorrect account' };
    return { status: true, value: '1' };

};

export default LoginController;
