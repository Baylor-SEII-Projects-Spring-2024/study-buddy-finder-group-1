import {useRouter} from "next/router";

export default function Meeting() {
    const router = useRouter();
    const { meetupId } = router.query;

    return (
        <>
            <h1>Meeting with id of: {meetupId}</h1>
        </>
    )
}