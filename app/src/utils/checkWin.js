export function checkWin(lastLogTime, animateWin, bigWinText, lowWinText, reels, winSheets) {
    const currentTime = Date.now();
    const sameTags = reels[0].tags[2] == reels[1].tags[2];
    const allSameTags = sameTags && reels[0].tags[2] == reels[2].tags[2];
    const tagIndex = parseInt(reels[0].tags[2].split('_')[1]) - 1;

    if (currentTime - lastLogTime >= 250) {
        lastLogTime = currentTime;
        animateWin = !animateWin;
    }

    if (allSameTags) {
        console.log(">>>>> BIGGER WIN <<<<<");
        bigWinText.visible = true;
    } else if (sameTags) {
        console.log(">>>>> LESS WIN <<<<<");
        lowWinText.visible = true;
    } else {
        console.log("TRY AGAIN!");
    }


    if (allSameTags || sameTags) {
        const textureKey = `P_${tagIndex + 1}_${animateWin ? 'B' : 'A'}`;

        for (let i = 0; i < 2 + (allSameTags ? 1 : 0); i++) {
            const texture = winSheets[tagIndex].textures[textureKey];
            reels[i].symbols[2].texture = texture;
        }
    }

    return {lastLogTime, animateWin};
}