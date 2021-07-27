import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { getSession } from 'next-auth/client'

dbConnect();

export default async (req, res) => {
    const session = await getSession({ req });
    if (session) {
        const {method} = req;
        //console.log(method) // post or get method 
        if (session.user.name === 'admin') {
        switch(method) {
            case "GET": 
              try {
                   const users = await User.find({})
                   res.status(200).json({success: true, data: users})
    
                } catch (error) {
                    res.status(400).json({success: false})
            }
            break;
            case 'POST':
                try {
                    const user = await User.create(req.body);
                    res.status(201).json({success: true, data: user})
                } catch (error) {
                    res.status(400).json({success: false})
                }
            break;
           default: 
                   res.status(400).json({success: false});
           break;
        }
    } else {
        res.status(401).json({message: 'No Access!'})
    }
    } else {
        // Not Signed in
        res.status(401).json({message: 'No Access!'})
    
    }
   
}