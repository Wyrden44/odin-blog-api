import prisma from "./lib/prisma.ts";

async function main() {
    console.log("Starting");

    await prisma.blog.create({
        data: {
            title: "Populated test Blog",
            content: "This blog will be used for testing purposes",
            userId: 1,
        }
    });

    await prisma.blog.create({
        data: {
            title: "very very very very very very very very alsjfsjaflsajflsjflksjalfjasdlljsdaflkjsadlfjslkasdfjsadjflkajsdlkfjadslfjasdljfladsjflasdjlfjadslfjadslö long title",
            content: "lasjdfljasdlkfjsdklajfgklsdajlfkjsdalkfjlksadjflkasdjfladsjlfjdsalfjlasldfjlsdajfljlfjsadlkajshfjlkfaslkjfladsjflödsajflkjadslfjadslfjladsösadjlkfjsaldfjlksdjflksdajflkasdjflsadjflkadsjflas",
            userId: 1
        }
    })

    console.log("Finished");
}

main().then(() => prisma.$disconnect())