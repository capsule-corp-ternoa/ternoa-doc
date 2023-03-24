import React from 'react';
import { useEffect } from "react";
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/night-owl.css';
import Clipboard from '../global/CopyToClipboard';
import styles from './styles.module.css';
import clsx from 'clsx';

export default function CodeBlockSnippet() {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    //Start Snippet
    //Do not format snippet as used is <pre/><code> below
    const snippet = `import { createNft } from "ternoa-js/nft";
import { generateSeed, getKeyringFromSeed } from "ternoa-js/account"
const createMyFirstNFT = async () => {
    try {
        const account = await generateSeed()
        const keyring = await getKeyringFromSeed(account.seed)
        const address = keyring.address
        await createNft(address, "My first NFT", 10, null, false, keyring)
    } catch(e) {
        console.log(e)
    }
}



`
    //End Snippet
    return (
        <div className={clsx(styles.radius, styles.cardBg, "p3 card")}>
            <div className="dFlex justifyContentBetween py3 p2">
                <a href="https://ternoa-js.ternoa.dev/" className={clsx("fwBold", styles.snippetTitle)} target="_blank" rel="noreferrer noopener">Javascript SDK</a>
                <div className="dFlex alignItemsCenter">
                    <Clipboard
                        content={snippet}
                        placeholder={'Copy'}
                    />
                </div>
            </div>
            <pre>
                <code className={clsx(styles.radius, "p4 my2")}>
                    {`${snippet}`}
                </code>
            </pre>
        </div>
    );
}
