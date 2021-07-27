import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { getSession } from 'next-auth/client'


dbConnect();

export default async (req, res) => {
    const session = await getSession({ req });
    if (session) {
        console.log('Session', JSON.stringify(session, null, 2));
        const {
            // id is referencing /3837373 etc 
           query: { id },
           method
        } = req;
    
        switch(method) {
            case 'GET': 
               try {
                  const user = await User.findById(id);
                  if (!user) {
                      return res.status(400).json({success: false});
                  }
                  res.status(200).json({success: true, data: user})
               } catch (error) {
                res.status(400).json({success: false});
               }
               break;
            case 'PUT':
                try {
    
                    const user = await User.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true
                    });
    
                    if (!user) {
                        return res.status(400).json({success: false});
                    }
                    res.status(200).json({success: true, data: user})
    
    
                } catch (error) {
                    res.status(400).json({success: false});
                }
                break;
            case 'DELETE': 
               try {
                 const deletedUser = await User.deleteOne({_id: id});
    
                 if (!deletedUser) {
                     return res.status(400).json({success: false})
                 }
                 // whatever is in the .json({obj}) according to the status will get logged out
                 res.status(200).json({success: true , data: {} });
    
               } catch (error) {
                res.status(400).json({success: false})
               }
               break;
               default:
               res.status(400).json({success: false}) 
    
        } 

    } else {
    // Not Signed in
    res.status(401).json({message: 'No Access!'})

    }

    res.end() 
}