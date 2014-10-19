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

Lemma add_n_Sm : forall n m : N, add n (succ m) = succ (add n m).
Proof.
  simpl.
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

Lemma add_one_r : forall n : N, succ n = add n one.
Proof.
  intro n.
  simpl.
  reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Definition_by_Induction_of_Natural_Number_Addition/Corollary *)
Lemma add_corollary : forall a b : N, add (add a b) one = add a (add b one).
Proof.
  simpl.
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

(* Ref: https://proofwiki.org/wiki/Natural_Number_Addition_is_Associative *)
Theorem add_assoc : forall a b c : N, add (add a b) c = add a (add b c).
Proof.
  intros a b c.
  induction c.
  (* n = 0 *)
    rewrite add_n_0_eq_n.
    rewrite add_n_0_eq_n.
    reflexivity.
  (* n = k + 1 *)
    rewrite add_n_Sm.
    rewrite add_n_Sm.
    rewrite add_n_Sm.
    rewrite IHc.
    reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Definition:Multiplication *)
Fixpoint mult (n : N) (m : N) : N :=
  match m with
    | zero => zero
    | succ k => add n (mult n k)
  end.

Lemma mult_n_0_eq_0 : forall n : N, mult n zero = zero.
Proof.
  simpl.
  reflexivity.
Qed.

Lemma mult_0_n_eq_0 : forall n : N, mult zero n = zero.
Proof.
  intro n.
  induction n.
  (* n = 0 *)
    rewrite mult_n_0_eq_0.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite IHn.
    simpl.
    reflexivity.
Qed.

Lemma mult_n_0_eq_mult_0_n : forall n : N, mult n zero = mult zero n.
Proof.
  intro n.
  rewrite mult_n_0_eq_0.
  rewrite mult_0_n_eq_0.
  reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Multiplication_Commutativity_with_Successor *)
Theorem mult_Sn_m : forall a b : N, mult (succ a) b = add b (mult a b).
Proof.
  intros a b.
  induction b.
  (* n = 0 *)
    simpl.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite IHb.
    rewrite add_Sn_m.
    rewrite add_one_r.
    rewrite <- (add_assoc a b (mult a b)).
    rewrite (add_com a b).
    rewrite (add_assoc b a (mult a b)).
    rewrite (add_com b (add a (mult a b))).
    rewrite (add_assoc (add a (mult a b)) b one).
    rewrite <- add_one_r.
    rewrite add_com.
    reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Multiplication_is_Commutative *)
Theorem mult_com : forall a b : N, mult a b = mult b a.
Proof.
  intros a b.
  induction b.
  (* n = 0 *)
    apply mult_n_0_eq_mult_0_n.
  (* n = k + 1 *)
    simpl.
    rewrite IHb.
    rewrite <- mult_Sn_m.
    reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Multiplication_Distributes_over_Addition *)
Theorem mult_dist : forall a b c : N, mult c (add a b) = add (mult c a) (mult c b).
Proof.
  intros a b c.
  induction c.
  (* n = 0 *)
    rewrite mult_0_n_eq_0.
    rewrite mult_0_n_eq_0.
    rewrite mult_0_n_eq_0.
    rewrite add_0_n_eq_n.
    reflexivity.
  (* n = k + 1 *)
    rewrite mult_Sn_m.
    rewrite IHc.
    rewrite (add_com a b).
    rewrite (add_assoc b a (add (mult c a) (mult c b))).
    rewrite <- (add_assoc a (mult c a) (mult c b)).
    rewrite (add_com (add a (mult c a)) (mult c b)).
    rewrite <- (add_assoc b (mult c b) (add a (mult c a))).
    rewrite add_com.
    rewrite <- mult_Sn_m.
    rewrite <- mult_Sn_m.
    reflexivity.
Qed.

(* Ref: https://proofwiki.org/wiki/Natural_Number_Multiplication_is_Associative *)
Theorem mult_assoc : forall a b c : N, mult (mult a b) c = mult a (mult b c).
Proof.
  intros a b c.
  induction c.
  (* n = 0 *)
    simpl.
    reflexivity.
  (* n = k + 1 *)
    simpl.
    rewrite IHc.
    rewrite <- mult_dist.
    reflexivity.
Qed.