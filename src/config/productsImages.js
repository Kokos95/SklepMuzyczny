import p1 from '../images/p1.jpg'
import p2 from '../images/p2.jpg'
import p3 from '../images/p3.jpg'
import p4 from '../images/p4.jpg'
import p5 from '../images/p5.jpg'
import p6 from '../images/p6.jpg'
import p7 from '../images/p7.jpg'
import p8 from '../images/p8.jpg'

export const getProductsImages = id => {
    switch(parseInt(id)) {
        case 1: return p1
        case 2: return p2
        case 3: return p3
        case 4: return p4
        case 5: return p5
        case 6: return p6
        case 7: return p7
        case 8: return p8
        default: return p1
    }
}