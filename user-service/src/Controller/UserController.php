<?php

namespace App\Controller;


use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;


class UserController extends AbstractController
{
    #[Route('/users', name: 'userService_createUser', methods: ["POST"])]
    public function createUser(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $jsonData = $request->getContent();
        $user = $serializer->deserialize($jsonData, User::class, 'json');
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }
        $hash = $passwordHasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hash);
        $entityManager->persist($user);
        $entityManager->flush();
        return $this->json([
            ["userId" => $user->getId(), "message" =>"User created"],
            201,
        ]);
    }

    #[Route('/auth/login', name: 'userService_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user): JsonResponse
    {
        if (null === $user) {
            return $this->json(['message' => 'missing credentials'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
        ]);
    }

    #[Route('/auth/validate', name: 'userService_token_validation', methods: ['POST'])]
    public function validateToken(Request $req, JWTTokenManagerInterface $jwtManager, TokenStorageInterface $tokenStorageInterface): JsonResponse
    {
        try{
            $decodedJwtToken = $jwtManager->decode($tokenStorageInterface->getToken());
            return $this->json(['validationStatus' => $decodedJwtToken, 'isValid'=>true], Response::HTTP_OK);
        }
        catch(JWTDecodeFailureException $error){
            return $this->json(['message' => $error], Response::HTTP_UNAUTHORIZED);
        }
    }
}
