(* Ref: https://proofwiki.org/wiki/Definition:Natural_Numbers *)

(* 1. 0 is a natural number. *)
(* 2. If n is a natural number, succ n is a natural number. *)
Inductive N :=
| zero : N
| succ : N -> N.

(* 3. 0 is not succ n. *)
Theorem axiom3 : forall n : N, succ n <> zero.
Proof.
  congruence.
Qed.

(* 4. If succ n = succ m, then n = m. *)
Theorem axiom4 : forall n m : N, succ n = succ m -> n = m.
Proof.
  congruence.
Qed.

(* 5. If (P 0) and (P n -> P (succ n)), then (P n). *)
Theorem axiom5 : forall P : N -> Prop,
                   P zero
                   -> (forall n : N, P n -> P (succ n))
                   -> forall n : N, P n.
Proof.
  intros P H H0 n.
  induction n.
  (* n = 0 *)
    apply H.
  (* n = k + 1 *)
    apply H0.
    apply IHn.
Qed.

(* Ref: https://proofwiki.org/wiki/Definition_by_Induction_of_Natural_Number_Addition *)
Fixpoint add (n : N) (m : N) : N :=
  match m with
    | zero => n
    | succ k => succ (add n k)
  end.

Definition one := succ zero.
Definition two := succ one.
Definition three := succ two.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Addition_Commutes_with_Zero *)
Lemma add_n_0_eq_n : forall n : N, add n zero = n.
Proof.
  simpl.
  congruence.
Qed.

Lemma add_0_n_eq_n : forall n : N, add zero n = n.
Proof.
  intro n.
  induction n.
  (* n = 0 *)
    simpl.
    reflexivity.
  (* n = k + 1*)
    simpl.
    rewrite IHn.
    reflexivity.
Qed.

Lemma add_n_0_eq_add_0_n : forall n : N, add n zero = add zero n.
Proof.
  intro n.
  rewrite add_n_0_eq_n.
  rewrite add_0_n_eq_n.
  reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Nuhttps://proofwiki.org/wiki/Natural_Number_Addition_is_Commutativember_Addition_Commutativity_with_Successor *)
Lemma add_Sn_m : forall n m : N, add (succ n) m = succ (add n m).
Proof.
  intros n m.
  induction m.
  (* n = 0 *)
    rewrite add_n_0_eq_n.
    rewrite add_n_0_eq_n.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite IHm.
    reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Addition_is_Commutative *)
Theorem add_com : forall a b : N, add a b = add b a.
Proof.
  intros a b.
  induction b.
  (* n = 0 *)
    rewrite add_n_0_eq_n.
    rewrite add_0_n_eq_n.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite add_Sn_m.
    rewrite IHb.
    reflexivity.
Qed.