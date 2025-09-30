const print = console.log;
export const printHelp = (isErr = false) => {
    isErr
        ? print("\nWrong params! See below...")
        : print("\n======Usage of Image Suiter======");
    print("img-suiter [0] [1] [2]:");
    print("[0] -- FROM or `-h`/`--help` will write this prompt");
    print("[1] -- TO");
    print("[2] -- DEBUG MODE");
    print("Example:");
    print("img-suiter ./ ./folder/\n");
};
