import { PayPalButtons } from "@paypal/react-paypal-js"
import { useState } from "react"

export const PaypalCheckoutBtn = ( props ) => {
  
    let { product, setOrder } = props

    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)

    const handleApprove = (orderID) => {
        //llamar back para terminar orden
        //si acepta =>
        setPaidFor(true)

        //si devuelve error
        // setError('Oopss!,Recibimos tu pedido, pero no pudimos procesarlo. Contacta al administrador', 'warning' )

    }
     
    // if(paidFor){
    //         Swal.fire('Perfecto!', 'Has accedido a los contactos del trabajador.¡Contáctalo!', 'success' )
    // }

    // if(error){
    //     Swal.fire('Error', error, 'error')
    // }
    

    return (
    <PayPalButtons style={{
        
        size: "large",
        shape: "pill",
        label: 'pay',
        
       
        // shape: 'pill',
        // size: 'responsive',
        // label: 'paypal'
    }}
    onClick={(data, actions) => {
        const hasAlreadyPurchased = false
        
        if(hasAlreadyPurchased){
            setError('Ya has pagado tu derecho a ver los datos de contacto!')
            return actions.reject()
        }else{

            return actions.resolve()    
        }


    }}
    createOrder = {(data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: product.description,
                    amount: {
                        value: product.price
                    }
                },
                    
                
            ]
        });
    }}
    onApprove={async(data, actions) => {
        
        
        setOrder(await actions.order.capture())
        handleApprove(data.orderID)
        
    }}
    onCancel={() => {

    }}

    onError={(err) => {
        setError(err)
        console.log("PayPal Checokout onError", err)
    }}
    />
  )
}
