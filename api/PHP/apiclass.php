<?php
require_once('pdo.php');
class TimeLine
{ 
    
    public function CreateStudent($name)
    {
        //pddddooo
        $query = SPDO::getInstance()->prepare('INSERT INTO `NotesEtudiants`.`Students` (`id`, `name`) VALUES (NULL, :name);');
        $query->bindParam(':name', $name);
        $cr = $query->execute();
        if($cr != 1)
        {
            echo "error";
        } else {
            echo "Done";   
        }
    }

    public function CreateNote($name,$note,$matiere)
    {   

        //pddddooo
        $reponse = SPDO::getInstance()->query('SELECT id FROM Students WHERE name = "'.$name.'"');
        $reponse->execute();
        $donnees = $reponse->fetch();
        $id = $donnees['id'];

        $reponse->closeCursor();


        $query = SPDO::getInstance()->prepare('INSERT INTO `NotesEtudiants`.`Notes` (`id`, `Matiere`, `note`, `student`) VALUES (NULL, :matiere, :note, :student);');
        $query->bindParam(':matiere', $matiere);
        $query->bindParam(':student', $id);
        $query->bindParam(':note', $note);
        $cr = $query->execute();
        if($cr != 1)
        {
            echo json_encode("error");
        } else {
            echo json_encode("Done");   
        }
    }

    public function GetAllNotes($name)
    {
        //pddddooo
        $query = SPDO::getInstance()->prepare('SELECT * FROM Notes INNER JOIN Students ON Students.name = "'.$name.'" AND Notes.student = Students.id');
        //$resultats->closeCursor();
        $query->execute();
        $result = $query->fetchAll();
        echo json_encode($result);
    }

    public function GetAllStudents()
    {
        //pddddooo
        $query = SPDO::getInstance()->prepare('SELECT * FROM Students');
        //$resultats->closeCursor();
        $query->execute();
        $result = $query->fetchAll();
        echo json_encode($result); 
    }
}


/*$tl = new TimeLine();
            $tl->GetAllStudents(1);*/
?>