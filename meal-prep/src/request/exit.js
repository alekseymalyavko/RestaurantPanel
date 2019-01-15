import router from "../router";
import { deleteCokie } from "./cookie";

export function exit (error) {
    console.log(error)
    // deleteCokie('Authorization')
    // router.options.routes[1].meta.authorized = false;
    // router.push("/");
}