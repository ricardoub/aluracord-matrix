import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    // Usuario
    /*
    - digita no campo textarea
    - aperta enter para enviar
    - tem que adicionar o texto na listagem

    // dev
    [x] - criar campo textarea
    [x] - criar o onChange, 
    [x]   - usa o useState
    [x]   - ter if para caso seja enter limpar a variável
    [x] - lista de mensagens
    [x] - botão enviar, com mesma função do enter
    [x] - botão apagar mensagem - usar filter, conforme codigo do rafaasimi
    */

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagens.length + 1,
            de: 'vanessametonini',
            texto: novaMensagem,
        }
        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens,
        ]);
        setMensagem('');
    }

    function handleDeleteMessage(event) {
        const messageId = Number(event.target.dataset.id)
        const messageListFiltered = listaDeMensagens.filter((messageFiltered) => {
            return messageFiltered.id != messageId
        })

        setListaDeMensagens(messageListFiltered)
    }

    // ./Sua lógica vai aqui

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} handleDeleteMessage={handleDeleteMessage} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            onClick={(event) => {
                                handleNovaMensagem(mensagem);
                            }}
                            variant='tertiary'
                            colorVariant='neutral'
                            label='Enviar'
                            href="/chat"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageDelete(props) {
    console.log('MessageDelete: ' + props.mensagem);
}

function MessageList(props) {
    console.log('MessageList', props.listaDeMensagens);

    // conforme codigo rafaasimi
    const handleDeleteMessage = props.handleDeleteMessage

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/vanessametonini.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Text
                                onClick={handleDeleteMessage}
                                styleSheet={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    color: '#FFF',
                                    backgroundColor: 'rgba(0,0,0,.5)',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                tag="span"
                                data-id={mensagem.id}
                            >
                                X
                            </Text>
                        </Box>
                        {mensagem.texto}
                        {/* <Button
                            //value={mensagem.id}
                            // onClick={(mensagem) => {
                            //     const id = mensagem.id;
                            //     console.log('mensagem apagada: ' + id);
                            //     MessageDelete(mensagem);
                            // }}
                            onClick={function (event, mensagem){
                                event.preventDefault();
                                console.log('Alguem apagou mensagem' + event);
                                // window.location.href = '/chat';
                                //roteamento.push('/chat');
                            }}
                            variant='tertiary'
                            colorVariant='neutral'
                            label='Apagar'
                            href="/chat"
                        /> */}
                    </Text>
                );
            })}

        </Box>
    )
}